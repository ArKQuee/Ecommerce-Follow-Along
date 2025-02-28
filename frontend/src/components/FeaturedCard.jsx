import PropTypes from 'prop-types';

const FeaturedCard = ({ title, description, action, actionText }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-bold mb-3">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <button 
        onClick={action}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
      >
        {actionText}
      </button>
      </div>
  );
  
  FeaturedCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    action: PropTypes.func.isRequired,
    actionText: PropTypes.string.isRequired,
  };
  
  export default FeaturedCard;
  

  