/* eslint-disable react/prop-types */
import ProjectContextMenu from './ProjectContextMenu';
import PageContextMenu from './PageContextMenu';
import FunctionContextMenu from './FunctionContextMenu';
import VariableContextMenu from './VariableContextMenu';

export default function ContextMenu({ type, name, id }) {
    const target = {
        name: name,
        id: id,
    };
    const renderContextMenu = () => {
        switch (type) {
            case 'project':
                return <ProjectContextMenu target={target} />;
            case 'page':
                return <PageContextMenu target={target} />;
            case 'variable':
                return <VariableContextMenu target={target} />;
            case 'function':
                return <FunctionContextMenu target={target} />;
            default:
                return <div> No Menu available</div>;
        }
    };

    return <div>{renderContextMenu()}</div>;
}
