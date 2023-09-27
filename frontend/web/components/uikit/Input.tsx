import { theme } from "@themes/theme"
import { Input } from "tamagui"


export default (props) => {
    return (
        <Input
            size="$4"
            borderColor={theme.text}
            {...props}
            focusStyle={{
                borderColor: theme.color,
                borderWidth: 2,
                ...props.focusStyle
            }}
            hoverStyle={{
                borderColor: theme.text,
                ...props.hoverStyle
            }}
        />
    )
}