import { jsx as _jsx } from "react/jsx-runtime";
const MainContainer = ({ children, className }) => {
    return (_jsx("div", { className: `main-container ${className || ''}`, children: children }));
};
export default MainContainer;
