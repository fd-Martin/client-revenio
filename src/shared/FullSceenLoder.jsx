import React from 'react';

const FullSceenLoder = () => {
    return (
<div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
    </div>
    );
};

export default FullSceenLoder;