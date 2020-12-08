export const formatSettlementFields = (settlements, locale) => {
  const fieldNames =
    locale === 'ru'
      ? {
          description: 'DescriptionRu',
          region: 'RegionsDescriptionRu',
          area: 'AreaDescriptionRu'
        }
      : {
          description: 'Description',
          region: 'RegionsDescription',
          area: 'AreaDescription'
        };
  return settlements.map((settlement) => {
    const description = settlement[fieldNames.description];
    const region = settlement[fieldNames.region]
      ? ` - ${settlement[fieldNames.region]}`
      : '';
    const area = settlement[fieldNames.area]
      ? ` - ${settlement[fieldNames.area]}`
      : '';
    return {
      Ref: settlement.Ref,
      FullDescription: `${description}${region}${area}`
    };
  });
};

export const formatWarehouseFields = (warehouses, locale) => {
  const fieldName = locale === 'ru' ? 'DescriptionRu' : 'Description';
  return warehouses.map((warehouse) => ({
    Ref: warehouse.Ref,
    FullDescription: warehouse[fieldName]
  }));
};
