import React from 'react';
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";

const Widgets = () => {
	return (
		<div className="xl:w-[600px] hidden lg:inline ml-8 space-y-5">
			<div className="w-[90%] xl:w-[75%] sticky top-0 bg-white py-1.5 z-50">
				<div className="flex items-center border rounded-full p-3 bg-gray-200 relative">
					<MagnifyingGlassIcon className="h-5 z-50 text-gray-500 "/>
					<input type="text" className="border-none rounded-full focus:ring-0 bg-gray-100 inset-0 absolute pl-11 border-gray-500 text-gray-700 focus:shadow-lg focus:bg-white" placeholder="Search Tweeter"/>
				</div>
			</div>
		</div>
	);
};

export default Widgets;
