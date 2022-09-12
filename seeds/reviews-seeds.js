const { Reviews } = require('../models');

const reviewdata = [
    {
      review_text: 'my lawn looks great.',
      user_id: 2,
      appointment_id: 1
    },
    {
        review_text: 'never seen such a big leaf pile. this young man worked so hard.',
        user_id: 3,
        appointment_id: 2
    },
    {
        review_text: 'great job',
        user_id: 3,
        appointment_id: 3
    },
    {
        review_text: 'not like my old lawn man used to do them but they at least they are not overgrown.',
        user_id: 2,
        appointment_id: 4
    }
  ];
  
  const seedReviews = () => Reviews.bulkCreate(reviewdata);
  
  module.exports = seedReviews;
  