import React, {forwardRef, useRef, useMemo, useImperativeHandle} from 'react'
import RNBottomSheet, { BottomSheetBackdrop } from '@gorhom/bottom-sheet'
import BottomSheet from '../atoms/bottom-sheet'
import { Box, Text } from '../atoms'

interface Props {
    onClose?: () => void
}


interface MoveNoteSheetHandle {
    show: () => void
}

const  MoveNoteSheet = forwardRef<MoveNoteSheetHandle, Props>(
  ({ onClose }, ref) => {
    const refBottomSheet = useRef<RNBottomSheet>(null)
    const snapPoints     = useMemo(() => ['60%', '90%'], [])

    useImperativeHandle(ref, () => ({
        show: () => {
            const { current: bottomSheet } = refBottomSheet
            if ( bottomSheet ){
                bottomSheet.snapToIndex(0)
            }
        }
    }))
    return (
        <BottomSheet  
          ref={refBottomSheet} 
          index={-1} 
          snapPoints={snapPoints}
          backdropComponent = { props => (
            <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
          )}
          detached={true}
          bottomInset={46}
          enablePanDownToClose={true}
          enableHandlePanningGesture={true}
          style={{marginHorizontal: 12}}
          onClose={onClose}
          >
           <Box justifyContent="center" alignItems="center">
            <Text fontWeight="bold">
                Move
            </Text>
           </Box>
        </BottomSheet>
    )
  }
)

type MoveNoteSheet = MoveNoteSheetHandle

export default MoveNoteSheet