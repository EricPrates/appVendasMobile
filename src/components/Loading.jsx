import { ActivityIndicator} from 'react-native-paper';

export default function Loading() {
    return (
        <ActivityIndicator 
            
            animating={true} 
            color="#ff6b35" 
            size="large" 
        />
    );
}