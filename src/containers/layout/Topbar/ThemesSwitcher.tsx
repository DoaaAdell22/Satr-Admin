import React, { useEffect, useState } from "react";
import { Button, Popover } from "antd";
import { useDispatch, useSelector } from "react-redux";
import themeSwitcherActions from "store/themeSwitcher/actions";
import config, { getTheme } from "store/themeSwitcher/config";

const { changeTheme } = themeSwitcherActions;

const ThemesSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const { themeName } = useSelector(
    ({ ThemeSwitcher }) => ThemeSwitcher
  );

  // الحالة الجديدة للتحكم بظهور الـ Popover
  const [visible, setVisible] = useState(false);

  // لما يتغير الـ Popover من ظاهر لمخفي
  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const content = (
    <ul className="min-w-[10rem] flex flex-col gap-[2px]">
      {config.options.map((el) => (
        <li key={el.themeId}>
          <Button
            className={`
              ${
                el.themeId === themeName
                  ? "text-primary hover:!text-primary dark:text-variant dark:hover:!text-variant"
                  : ""
              }
              w-full text-start flex items-center gap-2
            `}
            type="text"
            onClick={() => {
              dispatch(changeTheme(el.themeId));
              setVisible(false); // نخفي الـ Popover بعد الاختيار
            }}
          >
            {el.icon}
            <span>{el.locale}</span>
          </Button>
        </li>
      ))}
    </ul>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      placement="bottom"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={false}
    >
      <div className="cursor-pointer px-1 py-1 flex items-center text-primary dark:text-variant">
        {getTheme(themeName).icon}
      </div>
    </Popover>
  );
};

export default ThemesSwitcher;
