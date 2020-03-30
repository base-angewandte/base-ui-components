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
      options: ['AAAAAA', 'BBBBBB'],
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
      options: ['Publication', 'Musical', 'Performance', 'Exhibition', 'Architecture'],
    },
    {
      label: 'collection',
      type: 'chips',
      options: ['Current Art Works', 'Newest Events'],
    },
  ],
};
