import React from 'react'
import { Button } from './Button'
import classNames from 'classnames';

const Sort = ({ sortKey, onSort, children, activeSortKey }) => {
    // const sortClass = ['button-inline']
    const sortClass = classNames(
        'button-inline',
        { 'button-active': sortKey === activeSortKey }
      );

    // if (sortKey === activeSortKey) {
    //     sortClass.push('button-active');
    // }

    return (
        <Button
            className={sortClass}
            onClick={() => onSort(sortKey)}>
            {children}
        </Button>
    )
}
export default Sort