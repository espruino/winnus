{
  "targets": [
    {
      "target_name": "winnus",
      "sources": [ "winnus.cpp" ],
            'conditions': [
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
