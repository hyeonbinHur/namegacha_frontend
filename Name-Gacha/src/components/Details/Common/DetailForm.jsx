/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as detailUtil from '../../../utils/util/contextUtils';
import * as detailReducers from '../../../store/detailPageSlice';
import Spinner from '../../../assets/svgs/loading.svg';

export default function DetailForm({
    componentTarget, // id, exp, type, name
    type, // Add or Edit
    apiAction, // update, add api  function
    startAction, // start edit or start add
    deleteAction, // if type is Edit, delete function is required
    from,
    isLoading,
}) {
    const [newName, setNewName] = useState('');
    const [newExp, setNewExp] = useState('');
    const nameInputRef = useRef(null);
    const expInputRef = useRef(null);

    useEffect(() => {
        if (type === 'Edit') {
            setNewName(componentTarget.name);
            setNewExp(componentTarget.exp);
        }
    }, [componentTarget, type]);

    /**redux variable */
    const sliceTarget = useSelector((state) => state.detailPageSlice.target);
    const sliceFlag = useSelector(
        (state) => state.detailPageSlice[`is${type}`]
    );

    const componentIsTargetMatch = detailUtil.isDetailVerify(
        sliceTarget,
        componentTarget
    );

    const componentFlag = detailUtil[`checkIs${type}`](
        componentIsTargetMatch,
        sliceFlag
    );

    /**dispatches */
    const dispatch = useDispatch();
    const cancelActions = () => {
        if (type === 'Edit') {
            setNewName(componentTarget.name);
            setNewExp(componentTarget.exp);
        } else {
            setNewName('');
            setNewExp('');
        }
        dispatch(detailReducers.setClear());
    };
    const handleKeyDown = (e) => {
        const input = e.target;
        if (input.name === 'name') {
            if (e.key === 'Escape') {
                cancelActions();
            } else if (e.key === 'Enter') {
                expInputRef.current.focus();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                expInputRef.current.focus();
            }
        } else {
            if (e.key === 'Escape') {
                cancelActions();
            } else if (e.key === 'Enter') {
                apiAction();
            } else if (e.key === 'Tab') {
                e.preventDefault();
                nameInputRef.current.focus();
            }
        }
    };
    /**basic functions */
    const startButtonAction = () => {
        apiAction(newName, newExp);
        cancelActions();
    };
    return (
        <div className={`detail-${from}`}>
            {componentFlag ? (
                <div className={`detail-${from}--edit`}>
                    <input
                        className={`detail-${from}--edit__name`}
                        type="text"
                        name="name"
                        value={newName}
                        ref={nameInputRef}
                        onChange={(e) => setNewName(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <input
                        className={`detail-${from}--edit__exp`}
                        type="text"
                        name="exp"
                        value={newExp}
                        ref={expInputRef}
                        onChange={(e) => setNewExp(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e)}
                    />
                    <button
                        className={`detail-${from}--btn__save`}
                        onClick={() => startButtonAction()}
                    >
                        save
                    </button>
                    <button
                        className={`detail-${from}--btn__cancel`}
                        onClick={() => cancelActions()}
                    >
                        cancel
                    </button>
                </div>
            ) : (
                <div className={`detail-${from}--basic`}>
                    {type === 'Edit' ? (
                        <div className={`detail-${from}--basic__container`}>
                            <span className={`detail-${from}--basic__name`}>
                                {componentTarget.name}
                                <div>{isLoading}</div>
                            </span>

                            <div className={`detail-${from}--basic__exp`}>
                                {componentTarget.exp}
                            </div>
                            {isLoading ? (
                                <div>
                                    <img src={Spinner} alt="loading spinner" />
                                </div>
                            ) : (
                                <div>
                                    <i
                                        onClick={() =>
                                            deleteAction(componentTarget.id)
                                        }
                                        className={`icon-basic-elaboration-calendar-remove
                                  detail-${from}--btn__del`}
                                    />
                                    <i
                                        onClick={() => startAction()}
                                        className={`icon-basic-elaboration-calendar-pencil
                                  detail-${from}--btn__edit`}
                                    />
                                </div>
                            )}
                        </div>
                    ) : isLoading ? (
                        <div>
                            <img src={Spinner} alt="loading spinner" />
                        </div>
                    ) : (
                        <i
                            onClick={() => startAction()}
                            className={`icon-basic-elaboration-calendar-pencil detail-${from}--btn__action`}
                        />
                    )}
                </div>
            )}
        </div>
    );
}

// component target
