/* eslint-disable react/prop-types */
import * as varAPI from '../../../utils/api/aws/variableRoutes.js';
import { useMutation, useQueryClient } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import * as contextUtil from '../../../utils/util/contextUtils.js';
export default function VarCard({ variables, pageId }) {
    /* state */
    const [newVariableName, setNewVariableName] = useState('');

    /* redux variables */
    const sliceTarget = useSelector((state) => state.currentContextMenu.target);
    const sliceIsOpen = useSelector((state) => state.currentContextMenu.IsOpen);
    const sliceIsEdit = useSelector((state) => state.currentContextMenu.isEdit);

    /*component variables */

    // const componentIsThis = contextUtil.isContextVerity(sliceTarget )
    // const componentIsContextOpen
    // const commpoenentIsAdd
    // const componentIsEdit

    const { mutate: addVariable } = useMutation({
        mutationFn: ({ variableName, pageId }) => {
            return varAPI.createVariable(variableName, pageId);
        },
        onSuccess: () => {
            queryClient.invalidateQueries('getCertainProjects');
        },
    });
    const queryClient = useQueryClient();

    // open context menu, close context menu, edit variable, delet variable, add variable

    /**
     * open context menu
     * close context menu
     * edit variable
     * add variable
     * delete variable
     *
     */

    // const handleContextMenuOpen = () => {

    // }
    // const handlecontextMenuClose = () => {

    // }
    return (
        <div>
            <ul></ul>
        </div>
    );
}
