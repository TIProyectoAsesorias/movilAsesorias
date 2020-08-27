import React from 'react'
import { StackActions, DrawerActions } from '@react-navigation/native'

export const navigationRef = React.createRef()

export function navigate(name, params) {
    navigationRef.current?.navigate(name, params)
}

export function popToTop() {
    navigationRef.current?.dispatch(StackActions.popToTop())
}
