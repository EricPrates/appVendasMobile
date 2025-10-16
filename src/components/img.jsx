import { Image } from "react-native";

export default function Img({ produto, style }) {
    return (
        <Image
            source={{uri:produto.imagemUrl}}
            style={style}
            resizeMode="contain"
        />
    );
}