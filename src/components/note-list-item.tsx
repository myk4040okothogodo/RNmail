import React from 'react';
import { Box, Text, TouchableOpacity } from '../atoms';
import { Note } from '../models'
import SwipeableView from './swipeable-view';
import NoteListItemActionView from './note-list-item-action-view';


export interface ListItemProps extends Note {
  onPress: (noteId: string) => void
  onSwipeLeft?: (noteId: string, done: () => void) => void
}

const NoteListItem: React.FC<ListItemProps> = props => {

    const {onPress, onSwipeLeft, id} = props
    const handlePress = React.useCallback(() => {
      onPress(id)
    }, [onPress, id])
    const handleSwipeLeft = React.useCallback(
      done => {
      onSwipeLeft && onSwipeLeft(id, done)
    }, [id, onSwipeLeft])

    const renderBackView = React.useCallback(({progress}) => <NoteListItemActionView progress={progress}/>, [])
    return (
        <SwipeableView bg='yellow' onSwipeLeft={handleSwipeLeft} backView={renderBackView}>
          <Box bg='$background'>
          <TouchableOpacity bg="$background" px="lg" py="sm" onPress={handlePress}>
            <Text 
              ellipsizeMode='tail' 
              numberOfLines={1} 
              fontWeight='bold'
              mb='xs'
              >
                {props.title}
            </Text>
            <Text 
              ellipsizeMode='tail' 
              numberOfLines={3} 
              fontSize={14} 
              opacity={0.75}
            >
               {props.body} 
            </Text>
            </TouchableOpacity>
          </Box>
        </SwipeableView>
    )
}

export default NoteListItem