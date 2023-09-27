import { theme } from '@themes/theme';
import { Button } from 'tamagui';

export default (props) => {
    return (<Button
        fontWeight="700"
        fontSize="16px"
        color={theme.background}
        backgroundColor={!props.disabled ? theme.color : theme.colorPress }
        borderColor={!props.disabled ? theme.text : "transparent" }
        {...props}
        hoverStyle={{
            backgroundColor: theme.colorHover,
            ...props.hoverStyle
        }}
        pressStyle={{
            backgroundColor: theme.colorPress,
            ...props.hoverStyle
        }}
    >
        {props.children}
    </Button>)
}