import {
  BusinessPartner,
  BusinessPartnerResponse,
  PartnerNetworkDataGrid,
} from 'types/partnerNetwork/PartnerNetworkTypes'

import {
  RegistrationRequestAPIResponse,
  RegistrationRequestDataGrid,
} from 'types/userAdministration/UserAdministrationTypes'

// Temporary solution for mapping api response to DataGrid component type
const mapBusinessPartnerToDataGrid = (
  bpResponse: BusinessPartnerResponse
): Array<PartnerNetworkDataGrid> => {
  return bpResponse?.content?.map((bp: BusinessPartner) => {
    const bpAddress = bp.addresses[0]
    const taxObject = bp.identifiers.filter(
      (identifier) => identifier.type.technicalKey === 'EU_VAT_ID_DE'
    )
    return {
      id: bp.bpn,
      name: bp.names.filter(
        (name) =>
          name.type.technicalKey === 'INTERNATIONAL' ||
          name.type.technicalKey === 'LOCAL'
      )[0].value,
      country: bpAddress.country.name,
      street: bpAddress.thoroughfares[0].value,
      zipCode: bpAddress.postCodes[0].value,
      city: bpAddress.localities[0].value,
      taxId: taxObject.length > 0 ? taxObject[0].value : '',
    } as PartnerNetworkDataGrid
  })
}

const mapSingleBusinessPartnerToDataGrid = (
  bp: BusinessPartner
): PartnerNetworkDataGrid => {
  const bpAddress = bp.addresses[0]
  const taxObject = bp.identifiers.filter(
    (identifier) => identifier.type.technicalKey === 'EU_VAT_ID_DE'
  )
  return {
    id: bp.bpn,
    name: bp.names.filter(
      (name) =>
        name.type.technicalKey === 'INTERNATIONAL' ||
        name.type.technicalKey === 'LOCAL'
    )[0].value,
    country: bpAddress.country.name,
    street: bpAddress.thoroughfares[0].value,
    zipCode: bpAddress.postCodes[0].value,
    city: bpAddress.localities[0].value,
    taxId: taxObject.length > 0 ? taxObject[0].value : '',
  } as PartnerNetworkDataGrid
}

const mapRegistrationRequestResponseToDataGrid = (
  requestsResponse: Array<RegistrationRequestAPIResponse>
): Array<RegistrationRequestDataGrid> => {
  return requestsResponse?.map((request: RegistrationRequestAPIResponse) => {
    return {
      applicationId: request.application_id,
      changedDate: request.changed_date,
      companyInfo: {
        companyName: request.Company_name,
        userEmail: request.user_email,
        bpn: request.BPN,
      },
      contracts: request.contracts,
      street: request.street,
      houseNumber: request.house_number,
      plz: request.plz,
      city: request.city,
      country: request.country,
      status: request.status,
    } as RegistrationRequestDataGrid
  })
}

export {
  mapBusinessPartnerToDataGrid,
  mapSingleBusinessPartnerToDataGrid,
  mapRegistrationRequestResponseToDataGrid,
}
