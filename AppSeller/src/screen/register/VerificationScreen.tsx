import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import NavProps from '../../models/props/NavProps';
import TextComponent from '../../component/TextComponent';
import {TextInput} from 'react-native-gesture-handler';
import {appColors} from '../../constants/appColors';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ButtonComponent from '../../component/ButtonComponent';
import {getDataStore} from '../../redux/reducers/authReducers';
import {ArrowRight, Google} from '../../assest/svgs';
import {globalStyles} from '../../styles/globalStyles';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons';
import authenticationAPI from '../../apis/authApi';
import {useSelector} from 'react-redux';
import AlertComponent from '../../component/AlertComponent';
import LoadingComponent from '../../component/LoadingComponent';
const VerificationScreen: React.FC<NavProps> = ({navigation, route}: any) => {
  const {name, phone, email, address, pass, code} = route.params;
  const [currentCode, setCurrentCode] = useState<string>(code);
  const [codeValues, setCodeValues] = useState<string[]>([]);
  const [newCode, setNewCode] = useState('');
  const [limit, setLimit] = useState(120);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const storeData = useSelector(getDataStore);
  const [msg, setMsg] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const ref1 = useRef<any>();
  const ref2 = useRef<any>();
  const ref3 = useRef<any>();
  const ref4 = useRef<any>();

  useEffect(() => {
    ref1.current.focus();
  }, []);

  useEffect(() => {
    if (limit > 0) {
      const interval = setInterval(() => {
        setLimit(limit => limit - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [limit]);

  useEffect(() => {
    let item = ``;

    codeValues.forEach(val => (item += val));

    setNewCode(item);
  }, [codeValues]);

  const handleShowAlert = () => {
    setShowAlert(true);
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeCode = (val: string, index: number) => {
    const data = [...codeValues];
    data[index] = val;
    setCodeValues(data);
  };
  const saveUser = async (idStore: string) => {
    try {
      const res = await authenticationAPI.HandleAuthentication(
        '/nhanvien/nhanvienquanly',
        {
          idCH: idStore,
          taiKhoan: email,
          matKhau: pass,
          tenNV: name,
          diaChi: address,
          sdt: phone,
        },
        'post',
      );

      if (res.success === true) {
        setMsg(res.msg);
      } else {
        setMsg(res.msg);
        handleShowAlert();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const saveData = async () => {
    try {
      setIsLoading(true);

      const storedName = storeData.tenCH;
      const storedEmail = storeData.email;
      const storedAddress = storeData.sdt;
      const storedMail = storeData.diaChi;

      const res = await authenticationAPI.HandleAuthentication(
        '/nhanvien/cuahang',
        {
          tenCH: storedName,
          email: storedEmail,
          sdt: storedAddress,
          diaChi: storedMail,
        },
        'post',
      );

      // Chờ 1 giây trước khi thực hiện lưu user
      setTimeout(() => {
        setIsLoading(false);
        if (res.success === true) {
          // setIdStore(res.index._id);
          saveUser(res.index._id); // Gọi hàm saveUser khi idStore đã được thiết lập
        } else {
          setMsg(res.msg);
          console.log(res.msg);
          handleShowAlert();
        }
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangeVerification = () => {
    if (parseInt(newCode) === code) {
      saveData();
      handleShowAlert();
    } else {
      setMsg('mã không đúng hoặc k hợp lệ');
      handleShowAlert();
    }
  };
  const handleResendVerification = async () => {
    setCodeValues(['', '', '', '']);
    setNewCode('');

    const api = '/test/verification';
    setIsLoading(true);
    try {
      const res: any = await authenticationAPI.HandleAuthentication(
        api,
        {email},
        'post',
      );

      setLimit(120);
      setCurrentCode(res.data.code);
      setIsLoading(false);

      console.log(res.data.code);
    } catch (error) {
      setIsLoading(false);
      console.log(`Can not send verification code ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <View style={styles.main}>
        <View style={styles.viewText}>
          <TextComponent
            text="Xác minh"
            size={35}
            styles={{fontWeight: '500', paddingBottom: 10}}
          />
          <TextComponent
            size={14}
            text={`Vui lòng nhập mã xác minh được gửi tới:  ${email.replace(
              /.{1,5}/,
              (m: any) => '*'.repeat(m.length),
            )}`}
          />
        </View>
        <View style={styles.viewInput}>
          <TextInput
            keyboardType="number-pad"
            ref={ref1}
            value={codeValues[0]}
            style={[styles.input]}
            maxLength={1}
            onChangeText={val => {
              val.length > 0 && ref2.current.focus();
              handleChangeCode(val, 0);
            }}
            // onChange={() => }
            placeholder="-"
          />
          <TextInput
            ref={ref2}
            value={codeValues[1]}
            keyboardType="number-pad"
            onChangeText={val => {
              handleChangeCode(val, 1);
              val.length > 0 && ref3.current.focus();
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            value={codeValues[2]}
            ref={ref3}
            onChangeText={val => {
              handleChangeCode(val, 2);
              val.length > 0 && ref4.current.focus();
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
          <TextInput
            keyboardType="number-pad"
            ref={ref4}
            value={codeValues[3]}
            onChangeText={val => {
              handleChangeCode(val, 3);
            }}
            style={[styles.input]}
            maxLength={1}
            placeholder="-"
          />
        </View>
      </View>
      <View style={styles.footer}>
        <ButtonComponent
          disable={newCode.length !== 4}
          //   onPress={handleVerification}
          text="Continue"
          type="primary"
          iconFlex="right"
          icon={
            <View
              style={[
                globalStyles.iconContainer,
                {
                  backgroundColor:
                    newCode.length !== 4 ? appColors.gray : appColors.primary,
                },
              ]}>
              <ArrowRight />
            </View>
          }
          onPress={handleChangeVerification}
        />
        {limit < 0 ? (
          <>
            <TextComponent
              text="Gửi lại code sau"
              flex={0}
              styles={{textAlign: 'center'}}
            />
            <TextComponent
              text={`${(limit - (limit % 60)) / 60}:${
                limit - (limit - (limit % 60))
              }`}
              flex={0}
              color={appColors.link}
              styles={{textAlign: 'center'}}
            />
          </>
        ) : (
          <ButtonComponent
            type="link"
            text="Gửi lại code"
            onPress={handleResendVerification}
          />
        )}
      </View>
      <LoadingComponent visible={isLoading} />
      <AlertComponent
        visible={showAlert}
        message={msg}
        onClose={handleCloseAlert}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // justifyContent: 'center',
    // alignItems: 'center',
    padding: 15,
    height: hp(100),
  },

  header: {
    height: hp(10),
  },
  main: {
    height: hp(30),
    flexDirection: 'column',
  },
  viewInput: {
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewText: {
    height: hp(17),
  },
  input: {
    height: 55,
    width: 55,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: appColors.gray2,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
  },
  footer: {
    alignItems: 'center',
  },
});

export default VerificationScreen;
