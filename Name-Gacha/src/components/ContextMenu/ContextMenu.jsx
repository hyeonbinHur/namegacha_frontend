/* eslint-disable react/prop-types */
import ProjectContextMenu from './ProjectContextMenu';
import PageContextMenu from './PageContextMenu';
import FunctionContextMenu from './FunctionContextMenu';
import VariableContextMenu from './VariableContextMenu';

export default function ContextMenu({ type, name, id, item }) {
    const target = {
        name: name,
        id: id,
    };
    const renderContextMenu = () => {
        switch (type) {
            case 'project':
                return <ProjectContextMenu item={item} />;
            case 'page':
                return <PageContextMenu item={item} />;
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
