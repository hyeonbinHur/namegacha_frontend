/* eslint-disable react/prop-types */
import ProjectContextMenu from './ProjectContextMenu';
import PageContextMenu from './PageContextMenu';
import FunctionContextMenu from './FunctionContextMenu';
import VariableContextMenu from './VariableContextMenu';
import VarContainerContext from './VarContainetContext';
import FnContainerContext from './FnContainer';

export default function ContextMenu({ type, item }) {
    const renderContextMenu = () => {
        switch (type) {
            case 'project':
                return <ProjectContextMenu item={item} />;
            case 'page':
                return <PageContextMenu item={item} />;
            case 'variable':
                return <VariableContextMenu item={item} />;
            case 'function':
                return <FunctionContextMenu item={item} />;
            case 'varContainer':
                return <VarContainerContext item={item} />;
            case 'FnContainer':
                return <FnContainerContext item={item} />;
            default:
                return <div> No Menu available</div>;
        }
    };

    return <div>{renderContextMenu()}</div>;
}
