/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addChild, editItSelf } from '../../store/contextMenuSlice';

export default function ProjectContextMenu({ target }) {
    const dispatch = useDispatch();

    const startRename = () => {
        dispatch(editItSelf({ name: target.name, id: target.id }));
    };
    const startAddChild = () => {
        dispatch(addChild({ addType: 'page' }));
    };

    return (
        <div>
            <button onClick={() => startRename()}>Rename</button>
            <div onClick={() => startAddChild()}>New Page</div>
            <div>Delete Project</div>
            <div>Share</div>
        </div>
    );
}
