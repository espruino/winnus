{
  "targets": [
    {
      "target_name": "winnus",
      "sources": [ "cpp/winnus.cpp" ],
      "conditions" : [
        ['OS=="win"', {
          'include_dirs': [
          ],
          'libraries': [
              'Setupapi.lib',
              'BluetoothAPIs.lib'
          ]
        }]
      ]
    }
  ]
}
