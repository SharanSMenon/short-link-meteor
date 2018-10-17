import React from 'react';

import LinksList from './LinksList';
import PrivateHeader from './PrivateHeader'
import AddLink from './AddLink';
import LinksListFilters from './LinksListFilters'
export default () => (
    <div>
        <PrivateHeader title="Short Link" />
        <div className="wrapper">
            <LinksListFilters />
            <AddLink />
            <LinksList />
        </div>
    </div>
)