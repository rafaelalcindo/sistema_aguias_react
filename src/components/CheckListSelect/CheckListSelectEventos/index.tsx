import React from 'react';

import styles from './styles.module.scss';

export function CheckListSelectEventos() {
    return (
        <div className='flex flex-row flex-wrap  w-full'>
            <div className={`${styles.col_list} shadow-lg shadow-indigo-500/40`}>
                <div className={`${styles.inputGroup}`}>
                    <input id="option1" name="option1" type="checkbox" />
                    <label htmlFor="option1">Option One</label>
                </div>
                <div className={`${styles.inputGroup}`}>
                    <input id="option2" name="option2" type="checkbox" />
                    <label htmlFor="option2">Option One</label>
                </div>
            </div>

            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <div className={`${styles.col_list} shadow-lg shadow-indigo-500/40`}>
                <h2>Teste 2</h2>
            </div>

        </div>
    );
}