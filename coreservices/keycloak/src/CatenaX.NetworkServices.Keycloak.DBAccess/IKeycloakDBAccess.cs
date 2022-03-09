using System.Collections.Generic;
using System.Threading.Tasks;
using CatenaX.NetworkServices.Keycloak.DBAccess.Model;

namespace CatenaX.NetworkServices.Keycloak.DBAccess

{
    public interface IKeycloakDBAccess
    {
        Task<IEnumerable<UserJoinedFederatedIdentity>> GetUserJoinedFederatedIdentity(string idpName,
                                                                                      string userId = null,
                                                                                      string providerUserId = null,
                                                                                      string userName = null,
                                                                                      string firstName = null,
                                                                                      string lastName = null,
                                                                                      string email = null);
    }
}
