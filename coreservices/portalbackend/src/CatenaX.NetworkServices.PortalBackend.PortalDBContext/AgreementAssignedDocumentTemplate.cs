﻿using System;

#nullable disable

namespace CatenaX.NetworkServices.PortalBackend.PortalDBContext
{
    public partial class AgreementAssignedDocumentTemplate
    {
        public Guid AgreementId { get; set; }
        public Guid DocumentTemplateId { get; set; }

        public virtual Agreement Agreement { get; set; }
        public virtual DocumentTemplate DocumentTemplate { get; set; }
    }
}
