import React from 'react';
import Widget from './Widget';

const CardSection = ({ widgetName, removeWidget }) => {
  const handleRemove = () => {
    removeWidget(widgetName);
  };

  if (widgetName === 'My Leads') {
    return (
      <Widget
        icon={<img src="images/leads.png" alt="My Leads Icon" className="rounded-full" />}
        title="My Leads"
        description="Track progress as you qualify leads."
        imgSrc="images/leads2.png"
        removeWidget={handleRemove}
      />
    );
  } else if (widgetName === 'My Opportunities') {
    return (
      <Widget
        icon={<img src="images/icon2.png" alt="My Opportunities Icon" />}
        title="My Opportunities"
        description="View your deals to keep them moving."
        imgSrc="images/graphics1.png"
        removeWidget={handleRemove}
      />
    );
  } else if (widgetName === 'My Contacts') {
    return (
      <Widget
        icon={<img src="images/icon3.png" alt="My Contacts Icon" />}
        title="My Contacts"
        showTable={true}
        removeWidget={handleRemove}
      />
    );
  } else {
    return null;
  }
};

export default CardSection;
