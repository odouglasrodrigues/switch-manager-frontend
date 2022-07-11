const interfaces = [
  {
    "GigabitEthernet0/0/1": {
      "status": "UP",
      "description": "OLT_SARZEDO-HUAWEI"
    }
  },
  {
    "GigabitEthernet0/0/2": {
      "status": "Administratively DOWN",
      "description": "CLI-VCONLINE-PONTA_B"
    }
  },
  {
    "GigabitEthernet0/0/3": {
      "status": "UP",
      "description": "CLI-TRANSPORTES_SARZEDO"
    }
  },
  {
    "GigabitEthernet0/0/4": {
      "status": "UP",
      "description": "CLI-BVNET_PONTA-B"
    }
  },
  {
    "GigabitEthernet0/0/5": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/6": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/7": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/8": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/9": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/10": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/11": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/12": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/13": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/14": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/15": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/16": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/17": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/18": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/19": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "GigabitEthernet0/0/20": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "XGigabitEthernet0/0/1": {
      "status": "UP",
      "description": "LDI-73962-0_KRUCSNET"
    }
  },
  {
    "XGigabitEthernet0/0/2": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "XGigabitEthernet0/0/3": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "XGigabitEthernet0/0/4": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "40GE0/0/1": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "40GE0/0/2": {
      "status": "UP",
      "description": "UPLINK-CITROLANDIA"
    }
  },
  {
    "40GE0/0/3": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "40GE0/0/4": {
      "status": "UP",
      "description": "UPLINK"
    }
  },
  {
    "40GE0/0/5": {
      "status": "DOWN",
      "description": ""
    }
  },
  {
    "40GE0/0/6": {
      "status": "DOWN",
      "description": ""
    }
  }
]



const ge = interfaces.filter(ge =>{
  let regex = /^Giga/gi
  let name = Object.keys(ge)
  if (regex.test(name)){
    return ge
  }
})

const xge = interfaces.filter(xge =>{
  let regex = /^XGiga/gi
  let name = Object.keys(xge)
  if (regex.test(name)){
    return xge
  }
})

const ge40 = interfaces.filter(ge40 =>{
  let regex = /^40GE/gi
  let name = Object.keys(ge40)
  if (regex.test(name)){
    return ge40
  }
})


