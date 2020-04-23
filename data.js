module.exports = {
  FILTER_DATA: [
    {
      label: 'Current Art Works',
      type: 'text',
    },
    {
      label: 'Newest Events',
      type: 'text',
    },
    {
      label: 'location',
      type: 'text',
    },
    {
      label: 'keywords',
      type: 'chips',
      options: [
        {
          label: 'AAAAAA',
          id: 'AAAAAA',
        },
        {
          label: 'BBBBBB',
          id: 'BBBBBB',
        }],
    },
    {
      label: 'date range',
      type: 'daterange',
    },
    {
      label: 'date',
      type: 'date',
    },
    {
      label: 'type',
      type: 'chips',
      options: [
        {
          label: 'Publication',
          id: 'Publication',
        },
        {
          label: 'Musical',
          id: 'Musical',
        },
        {
          label: 'Performance',
          id: 'Performance',
        },
        {
          label: 'Exhibition',
          id: 'Exhibition',
        },
        {
          label: 'Architecture',
          id: 'Architecture',
        }],
    },
    {
      label: 'collection',
      type: 'chips',
      options: [
        {
          label: 'Current Art Works',
          id: 'Current_Art_Works',
        },
        {
          label: 'Newest Events',
          id: 'Newest_Events',
        }],
    },
  ],
};
