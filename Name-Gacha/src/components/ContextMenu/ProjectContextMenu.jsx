/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';

export default function ProjectContextMenu({ target }) {
    const dispatch = useDispatch();

    const startRename = (e) => {
        dispatch(editItSelf({ name: target.name, id: target.id }));
        e.stopPropagation();
    };
    const startAddChild = (e) => {
        dispatch(
            addChild({ addType: 'page', name: target.name, id: target.id })
        );
        e.stopPropagation();
    };

    return (
        <div>
            <button onClick={(e) => startRename(e)}>Rename</button>
            <div onClick={(e) => startAddChild(e)}>New Page</div>
            <div>Delete Project</div>
            <div>Share</div>
        </div>
    );
}
