﻿using CatenaX.NetworkServices.Cosent.Library.Data;
using CatenaX.NetworkServices.Invitation.Identity;
using CatenaX.NetworkServices.Invitation.Identity.Identity;
using CatenaX.NetworkServices.Invitation.Identity.Model;
using CatenaX.NetworkServices.Mailing.SendMail;
using CatenaX.NetworkServices.Mockups;
using CatenaX.NetworkServices.Onboarding.Service.Model;
using CatenaX.NetworkServices.Onboarding.Service.OnboardingAccess;

using Keycloak.Net;

using Microsoft.Extensions.Configuration;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CatenaX.NetworkServices.Onboarding.Service.BusinessLogic
{
    public class OnboardingBusinessLogic : IOnboardingBusinessLogic
    {
        private readonly IConfiguration _configuration;
        private readonly IOnboardingDBAccess _dbAccess;
        private readonly IMailingService _mailingService;

        public OnboardingBusinessLogic(IConfiguration configuration, IOnboardingDBAccess onboardingDBAccess, IMailingService mailingService)
        {
            _configuration = configuration;
            _dbAccess = onboardingDBAccess;
            _mailingService = mailingService;
        }

        public async Task CreateUsersAsync(List<UserCreationInfo> userList, string realm, string token, Dictionary<string, string> userInfo)
        {
            var manager = new KeycloakIdentityManager(new KeycloakClient(_configuration.GetValue<string>("KeyCloakConnectionString"), () => token), "");
            foreach (UserCreationInfo user in userList)
            {
                var newUser = new CreateUser
                {
                    UserName = user.eMail,
                    Email = user.eMail,
                    Groups = new List<string> { user.Role }
                };

                var password = await manager.CreateUser(realm, newUser);

                var inviteTemplateName = "invite";
                if (!string.IsNullOrWhiteSpace(user.Message))
                { 
                    inviteTemplateName = "inviteWithMessage";
                }

                var mailParameters = new Dictionary<string, string>
                {
                    { "password", password },
                    { "companyname", realm },
                    { "message", user.Message },
                    { "eMailPreferredUsernameCreatedBy", userInfo["preferred_username"] },
                    { "nameCreatedBy", userInfo["name"] }
                    
                };

                await _mailingService.SendMails(user.eMail, mailParameters, new List<string> { inviteTemplateName, "password" });
            }
        }

        public async Task FinishOnboardingAsync(string token, string realm)
        {
            var manager = new KeycloakIdentityManager(new KeycloakClient(_configuration.GetValue<string>("KeyCloakConnectionString"), () => token),"");
            var group = new CreateGroup { Name = "Onboarding" };
            await manager.CreateGroup(realm, group);
        }

        public Task<List<string>> GetAvailableUserRoleAsync()
        {
            return Task.FromResult(UserRoles.Roles);
        }

        public Task<Company> GetCompanyByOneIdAsync(string oneId)
        {
            var query = new QueryCompany();
            return Task.FromResult(query.Query(oneId));
        }

        public async Task<List<CompanyRole>> GetCompanyRolesAsync()
        {
            var result = await _dbAccess.GetAllCompanyRoles();
            return result.ToList();
        }

        public async Task<List<ConsentForCompanyRole>> GetConsentForCompanyRoleAsync(int roleId)
        {
            return (await _dbAccess.GetConsentForCompanyRole(roleId)).ToList();
        }

        public async Task SetCompanyRolesAsync(CompanyToRoles rolesToSet)
        {
            await _dbAccess.SetCompanyRoles(rolesToSet);
        }

        public async Task SetIdpAsync(SetIdp idpToSet)
        {
            await _dbAccess.SetIdp(idpToSet);
        }

        public async Task SignConsentAsync(SignConsentRequest signedConsent )
        {
            await _dbAccess.SignConsent(signedConsent);
        }

        public async Task<List<SignedConsent>> SignedConsentsByCompanyIdAsync(string companyId)
        {
           return (await _dbAccess.SignedConsentsByCompanyId(companyId)).ToList();
        }
    }
}
