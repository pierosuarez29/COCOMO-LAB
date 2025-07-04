import { jsx as _jsx } from "react/jsx-runtime";
import '../styles/SectionContainer.css';
const SectionContainer = ({ children, style, className }) => {
    return (_jsx("div", { className: `section-container ${className || ''}`, style: { ...style }, children: children }));
};
export default SectionContainer;
