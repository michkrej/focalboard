// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {useEffect} from 'react'

import {useAppDispatch} from '../store/hooks'
import {Board, IPropertyTemplate} from '../blocks/board'
import {Card} from '../blocks/card'

import {setModified as setModifiedAction} from '../store/cards'

import propsRegistry from '../properties'

type Props = {
    board: Board
    readOnly: boolean
    card: Card
    propertyTemplate: IPropertyTemplate
    showEmptyPlaceholder: boolean
}

const PropertyValueElement = (props: Props): JSX.Element => {
    const {card, propertyTemplate, readOnly, showEmptyPlaceholder, board} = props

    const dispatch = useAppDispatch()
    const setModified = () => {
        if (card.fields.modified === false) {
            dispatch(setModifiedAction(card))
        }
    }

    let propertyValue = card.fields.properties[propertyTemplate.id]
    useEffect(() => {
        console.log('Changed property value:', propertyValue)
    }, [propertyValue])

    if (propertyValue === undefined) {
        propertyValue = ''
    }
    const property = propsRegistry.get(propertyTemplate.type)
    const Editor = property.Editor
    return (
        <Editor
            property={property}
            card={card}
            board={board}
            readOnly={readOnly}
            showEmptyPlaceholder={showEmptyPlaceholder}
            propertyTemplate={propertyTemplate}
            propertyValue={propertyValue}
            setModified={setModified}
        />
    )
}

export default PropertyValueElement
