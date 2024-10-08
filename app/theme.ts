import { DefaultTheme as NavDefaultTheme, DarkTheme as NavDarkTheme } from '@react-navigation/native';

export const LightTheme = {
  ...NavDefaultTheme,
  colors: {
    ...NavDefaultTheme.colors,
    background: 'white',
    backgroundColor: 'white',
    text: 'black',
    spinnerColor: '#0000ff',
    drawerIcon: 'black',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#ccc',
    color: 'black',
  },
  text: {
    color: 'black',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  cardUser: {
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  chipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  username: {
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 8,
  },
  email: {
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 8,
  },
  createdAt: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: 'white',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
    width: '100%',
    backgroundColor: 'white',
    color : 'black',
  },
};


export const AppDarkTheme = {
  ...NavDarkTheme,
  colors: {
    ...NavDarkTheme.colors,
    background: 'black',
    text: 'white',
    spinnerColor: '#00bfff',
    drawerIcon: 'white',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#333',
    borderColor: '#555',
    color: 'white',
  },
  text: {
    color: 'white',
  },
  card: {
    backgroundColor: '#101010',
    borderRadius: 8,
    elevation: 3,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    overflow: 'hidden',
  },
  cardUser: {
    backgroundColor: '#1c1c1c',
    borderRadius: 12,
    elevation: 4,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'white',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  chip: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  chipText: {
    color: 'white',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
    color : 'white',
  },
  username: {
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 8,
    color : 'white',
  },
  email: {
    fontSize: 14,
    marginBottom: 4,
    marginLeft: 8,
    color : 'white',
  },
  createdAt: {
    fontSize: 12,
    color: '#bbb',
    marginLeft: 8,
  },
  icon: {
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  emptyText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ced4da',
    backgroundColor: 'black',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 44,
    width: '100%',
    backgroundColor: '#333',
    borderColor: '#555',
    color : 'white',
  },
};
