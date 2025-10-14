import { ScrollView, StyleSheet, Text, View } from "react-native";
import ViewBase from "./ViewBase";
import { Button, Icon } from "react-native-paper";
import { useAuth } from "../components/Provider";


export default function Perfil() {
    const { signOut, logado } = useAuth();
    const { usuario, nome, email, tipo } = logado;
   
   
    return (
        <ViewBase tabAtiva="perfil">
             <View style={styles.header}>
                <View style={styles.titleContainer}>
                     <Icon source="account-circle" size={100} color="#f9f9faff" />
                    <Text style={styles.title}>Perfil</Text>
                </View>
                <Text style={styles.subtitle}>Gerencie suas informações pessoais</Text>
            </View>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.container}>
                    <View style={styles.formCard}>
                        <Text style={styles.formTitle}>Informações do Usuário</Text>
                         <View style={{display: 'flex', alignItems: 'center', marginBottom: 20}}>
                           
                         </View>
                        <View style={{marginBottom: 12}}>
                            <Text style={styles.formLabel}>Nome:</Text>
                            <Text style={styles.formValue}>{nome}</Text>
                        </View>
                        <View style={{marginBottom: 12}}>
                            <Text style={styles.formLabel}>E-mail:</Text>
                            <Text style={styles.formValue}>{email}</Text>
                        </View>
                        <View style={{marginBottom: 12}}>
                            <Text style={styles.formLabel}>Tipo:</Text>
                            <Text style={styles.formValue}>{tipo}</Text>
                        </View>
                        <View style={{marginBottom: 12}}>
                            <Text style={styles.formLabel}>Usuário:</Text>
                            <Text style={styles.formValue}>{usuario}</Text>
                        </View>
                        <View style={styles.buttonContainer}>
                           
                            <Button 

                                mode="contained" 
                                style={styles.cancelButton}
                                labelStyle={styles.cancelButtonText}
                                onPress={() => navigation.goBack()}
                                icon="arrow-left"
                            >
                                Voltar
                            </Button>
                            <Button 
                                mode="contained" 
                                style={styles.submitButton}
                                labelStyle={styles.submitButtonText}
                                onPress={() => console.log('Cadastrar Usuário')}
                                icon="account-check"
                            >
                                Alterar Dados
                            </Button>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ViewBase>
    );
}

const styles = StyleSheet.create({
      header: {
        backgroundColor: '#ff6b35',
        padding: 18,
        paddingTop: 25,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 12,
    },
    subtitle: {
        fontSize: 16,
        color: 'rgba(255, 255, 255, 0.9)',
        textAlign: 'center',
        fontWeight: '500',
    },
    scrollView: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        padding: 16,
    },
    formCard: {
        backgroundColor: '#fff',
        borderRadius: 20,
        padding: 24,
        elevation: 6,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#ff6b35',
    },
    formTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#2c2c2c',
        textAlign: 'center',
        marginBottom: 18,
        borderBottomWidth: 2,
        borderBottomColor: '#ff6b35',
        paddingBottom: 12,
    },
    formLabel: {
        fontSize: 16,
        fontWeight: '600',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    formValue: {
        fontSize: 16,
        color: '#555',
    },
    halfInput: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
        marginTop: 16,
    },
    cancelButton: {
        flex: 1,
        backgroundColor: '#666',
        paddingVertical: 8,
        borderRadius: 12,
        elevation: 4,
    },
    cancelButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    submitButton: {
        flex: 2,
        backgroundColor: '#ff6b35',
        paddingVertical: 8,
        borderRadius: 12,
        elevation: 4,
    },
    submitButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
});