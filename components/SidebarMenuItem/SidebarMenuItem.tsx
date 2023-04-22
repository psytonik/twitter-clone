import React, {FC} from 'react';

const SidebarMenuItem: FC<any> = ({menuName,Icon,active}) => {

	return (
		<div className="flex hoverEffect items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
			<Icon className="h-7"/>
			<span className={`${active && "font-bold"} hidden xl:inline`}>
				{menuName}
			</span>
		</div>
	);
};

export default SidebarMenuItem;
