import { DrawerScreenProps } from '@react-navigation/drawer'
import { CompositeScreenProps } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import React, { useCallback, useRef } from 'react'
import { ContinousBaseGesture } from 'react-native-gesture-handler/lib/typescript/handlers/gestures/gesture'
import { useAnimatedRef } from 'react-native-reanimated'
import { Box, Container, Text, TouchableOpacity } from '../atoms'
import HeaderBar from '../components/header-bar'
import FeatherIcon from '../components/icon'
import MoveNoteSheet from '../components/move-note-sheet'
import NoteList from '../components/note-list'
import useStickyHeader from '../hooks/use-sticky-header'
import { HomeDrawerParamList, RootStackParamList } from '../navs'


type Props = CompositeScreenProps<
  DrawerScreenProps<HomeDrawerParamList, 'Main'>,
  NativeStackScreenProps<RootStackParamList>
>


export default function MainScreen({navigation}: Props) {

    const refMoveNoteSheet = useRef<MoveNoteSheet>(null)
    const {handleNoteListLayout, handleScroll, headerBarHeight,headerBarStyle} = useStickyHeader()
    const handleSidebarToggle = useCallback(() => {
      navigation.toggleDrawer()
    }, [navigation])

    const handleNoteListItemPress = useCallback((noteId: string) =>{

    }, [] )
    
    const handleNoteListItemSwipeLeft = useCallback(( _noteId: string, _conceal: () => void) => {
      const {current: menu} = refMoveNoteSheet
      if (menu) {
        menu.show()
      }
    },[])
    return (
        <Container justifyContent='center' alignItems='center'>
          <NoteList 
            contentInsetTop={headerBarHeight} 
            onScroll={handleScroll} 
            onItemPress={handleNoteListItemPress} 
            onItemSwipeLeft={handleNoteListItemSwipeLeft} 
          />
          <HeaderBar style={headerBarStyle} onLayout={handleNoteListLayout}> 
            <TouchableOpacity m='xs' p='xs' rippleBorderless onPress={handleSidebarToggle}>
              <FeatherIcon name="menu" size={22} />
            </TouchableOpacity>
              <Box flex={1} alignItems='center'>
                <Text fontWeight="bold">All Notes</Text>
              </Box>
            <TouchableOpacity m='xs' p='xs' rippleBorderless>
            <FeatherIcon name='more-vertical' size={22}/>
            </TouchableOpacity>
          </HeaderBar>
           <MoveNoteSheet  ref={refMoveNoteSheet}/>
        </Container>
    )
}