using System.Collections.Generic;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;

namespace CatenaX.NetworkServices.Provisioning.ActiveDirectory
{
    public class FederationSettings
    {
        public string Id { get; set; }
        public string Cert { get; set; }
        public string RequestUri { get; set; }
        public Request Request { get; set; }
    }

    public class Request
    {
        public string ODataType { get; set; }
        public string IssuerUri { get; set; }
        public string DisplayName { get; set; }
        public string MetadataExchangeUri { get; set; }
        public string PassiveSignInUri { get; set; }
        public string PreferredAuthenticationProtocol { get; set; }
        public string DomainODataType { get; set; }
        public List<string> DomainIds { get; set; }
        public string SigningCertificate { get; set; }
    }

    public static class FederationSettingsExtention
    {
        public static IServiceCollection ConfigureFederationSettings(
            this IServiceCollection services,
            IConfigurationSection section
            )
        {
            return services.Configure<FederationSettings>(x => section.Bind(x));
        }
    }

}
