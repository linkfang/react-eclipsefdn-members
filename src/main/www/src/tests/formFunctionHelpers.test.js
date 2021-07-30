import { mapPurchasingAndVAT } from '../Utils/formFunctionHelpers';

test('Map Purchasing and VAT data to match front-end form', () => {
  const dataFromBackEnd = {
    id: 'id',
    legal_name: 'legal_name',
    purchase_order_required: 'yes',
    vat_number: 'vat_number',
    registration_country: 'registration_country',
  };

  expect(mapPurchasingAndVAT(dataFromBackEnd)).toEqual({
    id: 'id',
    legalName: 'legal_name',
    purchasingProcess: 'yes',
    vatNumber: 'vat_number',
    countryOfRegistration: 'registration_country',
  });
});
