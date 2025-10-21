import { UsuarioController } from "../components/controller/Usuario.controller";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { FlatList, Text, View, Alert, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { ActivityIndicator } from "react-native-paper";
import ViewBase from "./ViewBase";

export default function EditarUsuarios() {
    const navigation = useNavigation();
    const control = UsuarioController();
    const [usuarios, setUsuarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [erro, setErro] = useState(null);

    const fetchUsuarios = async () => {
        try {
            setLoading(true);
            const response = await control.getUsuarios();
            
            
            
            if (response.success && Array.isArray(response.data)) {
                setUsuarios(response.data);
            } if (!response.success) {
                setErro(response.errors);
                setUsuarios([]);
            }
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            Alert.alert("Erro", "Não foi possível carregar os usuários");
            setUsuarios([]);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    const handleRefresh = async () => {
        setRefreshing(true);
        await fetchUsuarios();
    };

    const handleEditUser = (usuario) => {
        navigation.navigate('CadastrarUsuario', { usuario });
    };

    useEffect(() => {
        fetchUsuarios();
    }, []);

    if (loading && !refreshing) {
        return (
            <View style={[UsuarioStyles.loadingContainer, UsuarioStyles.container]}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={UsuarioStyles.loadingText}>Carregando usuários...</Text>
            </View>
        );
    }

    return (
        <ViewBase enableScroll={false} style={UsuarioStyles.container}>
      
            
            <View style={UsuarioStyles.header}>
                <Text style={UsuarioStyles.headerTitle}>Gerenciar Usuários</Text>
                <Text style={UsuarioStyles.headerSubtitle}>
                    {usuarios.length} usuário(s) cadastrado(s)
                </Text>
            </View>

          
            <FlatList
                data={usuarios}
                keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={UsuarioStyles.userItem}
                        onPress={() => handleEditUser(item)}
                        activeOpacity={0.7}
                    >
                        <Text style={UsuarioStyles.userName}>{item.nome || "Nome não disponível"}</Text>
                        <Text style={UsuarioStyles.userEmail}>{item.email || "Email não disponível"}</Text>
                        <Text style={UsuarioStyles.userInfo}>
                            ID: {item.id} • {item.tipo || "Usuário"}
                        </Text>
                        
                       
                        <View style={UsuarioStyles.actionButtons}>
                            <TouchableOpacity 
                                style={UsuarioStyles.editButton}
                                onPress={() => { handleEditUser(item);}}
                            >
                                <Text style={UsuarioStyles.buttonText}>Editar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={UsuarioStyles.deleteButton}
                                onPress={() => {}}
                            >
                                <Text style={UsuarioStyles.buttonText}>Excluir</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                )}
                ListEmptyComponent={
                    <View style={UsuarioStyles.emptyContainer}>
                        <Text style={UsuarioStyles.emptyIcon}>👥</Text>
                        <Text style={UsuarioStyles.emptyText}>
                            Nenhum usuário cadastrado{'\n'}
                            Clique no botão + para adicionar um novo usuário
                        </Text>
                    </View>
                }
                refreshing={refreshing}
                onRefresh={handleRefresh}
                contentContainerStyle={usuarios.length === 0 ? { flex: 1 } : UsuarioStyles.listContainer}
                showsVerticalScrollIndicator={false}
                
            />

           <View style={{ height: 80 }} >
            <TouchableOpacity 
                style={UsuarioStyles.fab}
                onPress={() => navigation.navigate('CadastrarUsuario')}
            >
                <Text style={UsuarioStyles.fabText}>+</Text>
            </TouchableOpacity>
        </View>
        </ViewBase>
    );
}


const UsuarioStyles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },

  header: {
    backgroundColor: '#6366f1',
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  
  headerSubtitle: {
    fontSize: 14,
    color: '#e0e7ff',
    textAlign: 'center',
    marginTop: 4,
  },

 
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  userItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
  },

  userItemPressed: {
    backgroundColor: '#f0f0f0',
    transform: [{ scale: 0.98 }],
  },

  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1f2937',
    marginBottom: 4,
  },

  userEmail: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8,
  },

  userInfo: {
    fontSize: 12,
    color: '#9ca3af',
  },


  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },

  emptyText: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },

  emptyIcon: {
    fontSize: 48,
    color: '#d1d5db',
    marginBottom: 16,
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#6366f1',
  },


  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },

  editButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginRight: 8,
  },

  deleteButton: {
    backgroundColor: '#ef4444',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
    flex: 1,
    marginLeft: 8,
  },

  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },


  searchContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },

  searchInput: {
    backgroundColor: '#f9fafb',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },

 
  fab: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#6366f1',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },

  fabText: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});


export const Colors = {
  primary: '#6366f1',
  primaryLight: '#818cf8',
  primaryDark: '#4f46e5',
  secondary: '#ec4899',
  success: '#10b981',
  danger: '#ef4444',
  warning: '#f59e0b',
  info: '#3b82f6',
  light: '#f8f9fa',
  dark: '#1f2937',
  gray: '#6b7280',
  white: '#ffffff',
  black: '#000000',
}; 