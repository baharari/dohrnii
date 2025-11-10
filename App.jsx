/**
* Sample React Native App
* https://github.com/facebook/react-native
*
* @format
*/

import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet, View, Pressable, ScrollView, Text as RNText } from 'react-native';

// UI Kütüphanesi bileşenlerini içe aktarıyoruz

import { ThemeProvider, useTheme } from './src/providers';
import { lightTheme, darkTheme } from './src/constants';
import { Menu, Alert, PinInput, List, Highlight, Image, BackgroundImage, Card, Avatar, Accordion, Modal, Tabs, Switch, Select, Grid, Flex, Textarea, Input, Radio, Checkbox, Button, Text, CreateTheme  } from './src/index';

function AppContent() {
 
  const btnType = "primary";
  const { toggleTheme, theme } = useTheme();
  const [value, setValue] = useState(false);
  const [newsletter, setNewsletter] = useState(false);
  const [test, setTest] = useState(0);
  const [code, setCode] = useState();
  // Yeni state'ler
  const [isModalOpen, setModalOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [gender, setGender] = useState('male');
  const [textareaValue, setTextareaValue] = useState('');
  useEffect(() => {
    console.log('====================================');
    console.log("code", code);
    console.log('====================================');
  }, [code])
  
  return (
    <ScrollView 
    style={[styles.container]}
    contentContainerStyle={styles.contentContainer}
    >
    <Text style={styles.header}>Dohrnii UI Kütüphanesi</Text>
    
    <Card style={{marginBottom: 10}}>
        <Button
          label={theme?.name === 'dark' ? 'Light Moda Geç' : 'Dark Moda Geç'}
          variant="outline"
          onPress={toggleTheme}
          theme={btnType}
        />

    <Text style={styles.sectionTitle}>Temel Butonlar</Text>
    <Button 
    label="Solid Button" 
    onPress={() => console.log('Primary button pressed')} 
    theme={btnType}
    />
    
    <View style={styles.spacer} />
    
    <Button 
    label="Soft Button" 
    onPress={() => console.log('Secondary button pressed')} 
    variant="soft"
    theme={btnType}
    />
    
    <View style={styles.spacer} />
    
    <Button 
    label="Outline Button" 
    onPress={() => console.log('Outline button pressed')} 
    variant={"outline"}
    theme={btnType}
    />
    
    <View style={styles.spacer} />
    
    <Button 
    label="Ghost Button" 
    onPress={() => console.log('Ghost button pressed')}
    variant="ghost"
    theme={btnType}
    />
    </Card>
    
    {/* Alert Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Alert Örnekleri</Text>
    <Alert title="Başarılı!" theme="success" variant="soft">
    İşlem başarıyla tamamlandı.
    </Alert>
    
    <View style={styles.spacer} />
    
    <Alert title="Uyarı!" theme="warning" variant="outline" icon={null}>
    Dikkat edilmesi gereken bir durum var.
    </Alert>
    
    <View style={styles.spacer} />
    
    <Alert title="Uyarı!" theme="error" variant="solid"  icon={null}>
    Dikkat edilmesi gereken bir durum var.
    </Alert>
    </Card>
    
    {/* Select Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Select Örnekleri</Text>
    
    <Select
    label="Framework"
    placeholder="Seçiniz"
    variant="outline"
    
    >
    <Select.Option value="react">React</Select.Option>
    <Select.Option value="angular" disabled>Angular (disabled)</Select.Option>
    <Select.Option value="vue">Vue</Select.Option>
    </Select>
    
    <View style={styles.spacer} />
    
    <Select
    label="Şehir"
    placeholder="Şehir seçin"
    data={['İstanbul', 'Ankara', 'İzmir']}
    value={test}
    onChange={setTest}
    />
    </Card>
    
    {/* PinInput Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>PinInput Örnekleri</Text>
    
    <PinInput
    label="PIN (4 haneli)"
    length={4}
    type="number"
    value={code}
    onChange={setCode}
    variant="soft"
    />
    
    <View style={styles.spacer} />
    
    <PinInput
    label="PIN (maskeli, 6 haneli)"
    length={6}
    type="number"
    mask
    
    />
    </Card>
    
    {/* Tabs Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Tabs Örnekleri</Text>
    <Tabs defaultValue="tab1" size="md" borderRadius={8}>
    <Tabs.List>
    <Tabs.Tab value="tab1">Genel</Tabs.Tab>
    <Tabs.Tab value="tab2">Ayarlar</Tabs.Tab>
    <Tabs.Tab value="tab3" disabled>Gelişmiş (devre dışı)</Tabs.Tab>
    </Tabs.List>
    
    <Tabs.Panel value="tab1">
    <Text>Genel sekmesi içeriği</Text>
    </Tabs.Panel>
    <Tabs.Panel value="tab2">
    <Text>Ayarlar sekmesi içeriği</Text>
    </Tabs.Panel>
    <Tabs.Panel value="tab3">
    <Text>Gelişmiş sekmesi içeriği</Text>
    </Tabs.Panel>
    </Tabs>
    </Card>
    
    {/* List Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>List Örnekleri</Text>
    <List type="decimal" size={14} gap={6}>
    <List.Item>Birinci öğe</List.Item>
    <List.Item type="upper-roman">İkinci öğe (Upper Roman)</List.Item>
    </List>
    </Card>
    
    {/* Radio.Group Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Radio Group Örnekleri</Text>
    <Radio.Group
    label="Cinsiyet"
    description="Bir seçim yapın"
    borderRadius={12}
    value={gender}
    onChange={setGender}
    >
    <Radio value="male" label="Erkek" />
    <Radio value="female" label="Kadın" />
    </Radio.Group>
    </Card>
    
    {/* Menu Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Menu Örnekleri</Text>
    <Menu width={220} withArrow>
    <Menu.Target>
    <Button label="Menüyü Aç" />
    </Menu.Target>
    <Menu.Dropdown>
    <>
    <Pressable onPress={() => console.log('Profil')}>
    <Text>Profil</Text>
    </Pressable>
    <View style={{ height: 8 }} />
    <Pressable onPress={() => console.log('Ayarlar')}>
    <Text>Ayarlar</Text>
    </Pressable>
    <View style={{ height: 8 }} />
    <Pressable onPress={() => console.log('Çıkış')}>
    <Text>Çıkış</Text>
    </Pressable>
    </>
    </Menu.Dropdown>
    </Menu>
    </Card>
    
    {/* Accordion Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Accordion Örnekleri</Text>
    <Accordion variant="solid" borderRadius={8} defaultValue="item1">
    <Accordion.Item value="item1">
    <Accordion.Control>Başlık 1</Accordion.Control>
    <Accordion.Panel>
    <Text>Panel 1 içeriği</Text>
    </Accordion.Panel>
    </Accordion.Item>
    
    <Accordion.Item value="item2">
    <Accordion.Control>Başlık 2</Accordion.Control>
    <Accordion.Panel>
    <Text>Panel 2 içeriği</Text>
    </Accordion.Panel>
    </Accordion.Item>
    </Accordion>
    </Card>
    
    {/* Input Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Input Örnekleri</Text>
    
    <Input
    label="Adınız"
    placeholder="Ad giriniz"
    />
    
    <View style={styles.spacer} />
    
    <Input
    variant="soft"
    label="E-posta"
    placeholder="ornek@mail.com"
    error={"lütfen doldurun"}
    />
    </Card>
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Input Örnekleri</Text>
    
    <Input
    label="Adınız"
    placeholder="Ad giriniz"
    />
    
    <View style={styles.spacer} />
    
    <Input
    variant="soft"
    label="E-posta"
    placeholder="ornek@mail.com"
    error={"lütfen doldurun"}
    />
    </Card>
    
    {/* Highlight Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Highlight Örnekleri</Text>
    <Highlight highlight={['React', 'Native']} color="warning.5">
    Bu metinde React Native kelimeleri vurgulanacak.
    </Highlight>
    
    <View style={styles.spacer} />
    
    <Highlight highlight="UI" color="info.5">
    Dohrnii UI Kütüphanesi bileşenleri harika!
    </Highlight>
    </Card>
    
    {/* Avatar Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Avatar Örnekleri</Text>
    <Flex gap="m" align="center">
    <Avatar size={48} variant="soft" borderRadius={900}>
    AH
    </Avatar>
    <Avatar
    size={48}
    borderRadius={900}
    src={{ uri: 'https://i.pravatar.cc/100?img=12' }}
    />
    </Flex>
    </Card>
    
    {/* Switch Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Switch Örnekleri</Text>
    <Switch
    checked={switchOn}
    onChange={setSwitchOn}
    label="Bildirimler"
    size="md"
    borderRadius={900}
    />
    
    <View style={styles.spacer} />
    
    <Switch
    checked={switchOn}
    onChange={(next) => setSwitchOn(!next)}
    label="Karanlık Mod (örnek)"
    size="lg"
    onColor="success.5"
    offColor="gray.3"
    borderRadius={900}
    />
    </Card>
    
    {/* Checkbox Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Checkbox Örnekleri</Text>
    <Checkbox
    checked={acceptTerms}
    onChange={setAcceptTerms}
    label="Şartları kabul ediyorum"
    variant="outline"
    />
    
    <View style={styles.spacer} />
    
    <Checkbox
    checked={newsletter}
    onChange={setNewsletter}
    label="Bültene abone ol"
    theme="gray"
    variant="soft"
    />
    </Card>
    
    {/* Textarea Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Textarea Örnekleri</Text>
    <Textarea
    label="Açıklama"
    placeholder="Açıklamanızı girin..."
    variant="outline"
    value={textareaValue}
    onChangeText={setTextareaValue}
    />
    
    <View style={styles.spacer} />
    
    <Textarea
    label="Hata örneği"
    placeholder="Boş bırakmayın"
    variant="soft"
    value={textareaValue}
    onChangeText={setTextareaValue}
    error={textareaValue.trim() === '' ? 'Bu alan zorunlu' : undefined}
    />
    </Card>
    
    {/* Modal Örnekleri */}
    <Card style={{ marginBottom: 10 }}>
    <Text style={styles.sectionTitle}>Modal Örnekleri</Text>
    <Button label="Modalı Aç" onPress={() => setModalOpen(true)} />
    <Modal
    opened={isModalOpen}
    onClose={() => setModalOpen(false)}
    title="Modal Başlık"
    overlayClose  
    >
    <Text>Modal içeriği burada.</Text>
    <View style={styles.spacer} />
    <Button label="Kapat" variant="outline" onPress={() => setModalOpen(false)} />
    </Modal>
    </Card>
    </ScrollView>
  );
}

function App() {
  const theme = CreateTheme({
    dark: {
      themeColors: {
        primary: '#8441ee',   // mevcut primary tonlarını override eder
        brand: '#8ed356',     // yeni renk; brand[1..9] otomatik eklenir
      },
      colors: {
        background: {
          primary: '#000000', // komponent bazlı override (deep merge)
        },
        input: {
          solid: {
            backgroundColor: '#121212', 
          }
        } 
      }
    }
   
  });

  return (
 
    <ThemeProvider mode="dark" theme={theme} >
    <AppContent />
    </ThemeProvider>
  
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subheader: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
    color: '#666',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#121213',
    padding: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  spacer: {
    height: 12,
  },
});

export default App;
