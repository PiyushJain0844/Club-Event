import React from 'react';

const Badge = ({ category }) => {
  const normalized = (category || 'Other').toLowerCase();
  const categoryClass = `badge badge-${normalized}`;

  return (
    <span className={categoryClass}>
      {category}
    </span>
  );
};

export default Badge;
