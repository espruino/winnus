#include <node.h>

#pragma warning (disable: 4068)
#include <windows.h>
#include <stdio.h>
#include <tchar.h>
#include <setupapi.h>
#include <devguid.h>
#include <regstr.h>
#include <bthdef.h>
#include <bluetoothleapis.h>

#include <iostream>
#include <sstream>
#include <string>
#include <locale>


namespace demo {

  using v8::Context;
  using v8::Array;
  using v8::Exception;
  using v8::Function;
  using v8::FunctionCallbackInfo;
  using v8::FunctionTemplate;
  using v8::Isolate;
  using v8::Local;
  using v8::Number;
  using v8::Object;
  using v8::Persistent;
  using v8::String;
  using v8::Value;





  void WINNUS_GetDevices(const FunctionCallbackInfo<Value>& args) {
    Isolate* isolate = args.GetIsolate();
    Local<Array> array = Array::New(isolate);

    HDEVINFO hDI;
  	SP_DEVINFO_DATA did;
  	DWORD i;

  	// Create a HDEVINFO with all present devices.
  	hDI = SetupDiGetClassDevs(&GUID_DEVCLASS_BLUETOOTH, NULL, NULL, DIGCF_PRESENT);
  	if (hDI == INVALID_HANDLE_VALUE) {
      isolate->ThrowException(Exception::Error(
          String::NewFromUtf8(isolate, "Unable to access Bluetooth adaptor")));
  		return;
  	}

  	// Enumerate through all devices in Set.
  	did.cbSize = sizeof(SP_DEVINFO_DATA);
  	for (i = 0; SetupDiEnumDeviceInfo(hDI, i, &did); i++)
  	{
  		bool hasError = false;

  		DWORD nameData;
  		PSTR nameBuffer = NULL;
  		DWORD nameBufferSize = 0;

  		while (!SetupDiGetDeviceRegistryProperty(
  			hDI,
  			&did,
  			SPDRP_FRIENDLYNAME,
  			&nameData,
  			(PBYTE)nameBuffer,
  			nameBufferSize,
  			&nameBufferSize))
  		{
  			if (GetLastError() == ERROR_INSUFFICIENT_BUFFER)
  			{
  				if (nameBuffer) delete(nameBuffer);
  				nameBuffer = new char[nameBufferSize * 2];
  			}
  			else
  			{
  				hasError = true;
  				break;
  			}
  		}

  		DWORD addressData;
  		LPSTR addressBuffer = NULL;
  		DWORD addressBufferSize = 0;

  		while (!SetupDiGetDeviceRegistryProperty(
  			hDI,
  			&did,
  			SPDRP_HARDWAREID,
  			&addressData,
  			(PBYTE)addressBuffer,
  			addressBufferSize,
  			&addressBufferSize))
  		{
  			if (GetLastError() == ERROR_INSUFFICIENT_BUFFER)
  			{
  				if (addressBuffer) delete(addressBuffer);
  				addressBuffer = new char[addressBufferSize * 2];
  			}
  			else
  			{
  				hasError = true;
  				break;
  			}
  		}

  		LPSTR deviceIdBuffer = NULL;
  		DWORD deviceIdBufferSize = 0;

  		while (!SetupDiGetDeviceInstanceId(
  			hDI,
  			&did,
  			deviceIdBuffer,
  			deviceIdBufferSize,
  			&deviceIdBufferSize))
  		{
  			if (GetLastError() == ERROR_INSUFFICIENT_BUFFER)
  			{
  				if (deviceIdBuffer) delete(deviceIdBuffer);
  				deviceIdBuffer = new char[deviceIdBufferSize * 2];
  			}
  			else
  			{
  				hasError = true;
  				break;
  			}
  		}

  		if (hasError)
  		{
  			continue;
  		}

      Local<Object> obj = Object::New(isolate);
      obj->Set(String::NewFromUtf8(isolate, "name"), String::NewFromUtf8(isolate, nameBuffer));
      obj->Set(String::NewFromUtf8(isolate, "addr"), String::NewFromUtf8(isolate, addressBuffer));
      obj->Set(String::NewFromUtf8(isolate, "deviceId"), String::NewFromUtf8(isolate, deviceIdBuffer));
      array->Set(array->Length(), obj);

  	}

    args.GetReturnValue().Set(array);
  }


void init(Local<Object> exports) {
  NODE_SET_METHOD(exports, "getDevices", WINNUS_GetDevices);
}

NODE_MODULE(winnus, init)

}  // namespace demo
