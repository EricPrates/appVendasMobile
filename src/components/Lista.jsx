import { List } from "react-native-paper";

export default function Lista({ style, icon, title, description, onPress }) {
    return (
        <List.Item
        icon={icon}
        style={style}
    title={title}
    onPress={onPress}
    
    left={props => <List.Icon {...props} icon={icon} />}
  />
    )
}