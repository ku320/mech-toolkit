/**
 * Mechanical Engineer Toolkit - Units Definition
 * Comprehensive 16 engineering categories with conversion factors to SI base units.
 */

export const UNIT_CATEGORIES = {
  length: {
    name: 'Length',
    baseUnit: 'm',
    icon: '📏',
    units: {
      m: { name: 'Meter', symbol: 'm', factor: 1 },
      mm: { name: 'Millimeter', symbol: 'mm', factor: 0.001 },
      cm: { name: 'Centimeter', symbol: 'cm', factor: 0.01 },
      km: { name: 'Kilometer', symbol: 'km', factor: 1000 },
      um: { name: 'Micrometer (µm)', symbol: 'µm', factor: 1e-6 },
      in: { name: 'Inch', symbol: 'in', factor: 0.0254 },
      ft: { name: 'Foot', symbol: 'ft', factor: 0.3048 },
      yd: { name: 'Yard', symbol: 'yd', factor: 0.9144 },
      mi: { name: 'Mile', symbol: 'mi', factor: 1609.344 },
      nm: { name: 'Nautical Mile', symbol: 'NM', factor: 1852 }
    }
  },

  mass: {
    name: 'Mass',
    baseUnit: 'kg',
    icon: '⚖️',
    units: {
      kg: { name: 'Kilogram', symbol: 'kg', factor: 1 },
      g: { name: 'Gram', symbol: 'g', factor: 0.001 },
      mg: { name: 'Milligram', symbol: 'mg', factor: 1e-6 },
      tonne: { name: 'Metric Ton', symbol: 't', factor: 1000 },
      lb: { name: 'Pound (mass)', symbol: 'lb', factor: 0.45359237 },
      oz: { name: 'Ounce', symbol: 'oz', factor: 0.028349523125 },
      slug: { name: 'Slug', symbol: 'slug', factor: 14.593903 }
    }
  },

  time: {
    name: 'Time',
    baseUnit: 's',
    icon: '⏱️',
    units: {
      s: { name: 'Second', symbol: 's', factor: 1 },
      ms: { name: 'Millisecond', symbol: 'ms', factor: 0.001 },
      min: { name: 'Minute', symbol: 'min', factor: 60 },
      hr: { name: 'Hour', symbol: 'h', factor: 3600 },
      day: { name: 'Day', symbol: 'd', factor: 86400 }
    }
  },

  area: {
    name: 'Area',
    baseUnit: 'm2',
    icon: '📐',
    units: {
      m2: { name: 'Square Meter', symbol: 'm²', factor: 1 },
      mm2: { name: 'Square Millimeter', symbol: 'mm²', factor: 1e-6 },
      cm2: { name: 'Square Centimeter', symbol: 'cm²', factor: 1e-4 },
      km2: { name: 'Square Kilometer', symbol: 'km²', factor: 1e6 },
      in2: { name: 'Square Inch', symbol: 'in²', factor: 0.00064516 },
      ft2: { name: 'Square Foot', symbol: 'ft²', factor: 0.09290304 },
      yd2: { name: 'Square Yard', symbol: 'yd²', factor: 0.83612736 },
      hectare: { name: 'Hectare', symbol: 'ha', factor: 10000 },
      acre: { name: 'Acre', symbol: 'ac', factor: 4046.8564224 }
    }
  },

  volume: {
    name: 'Volume',
    baseUnit: 'm3',
    icon: '🧊',
    units: {
      m3: { name: 'Cubic Meter', symbol: 'm³', factor: 1 },
      mm3: { name: 'Cubic Millimeter', symbol: 'mm³', factor: 1e-9 },
      cm3: { name: 'Cubic Centimeter (cc)', symbol: 'cm³', factor: 1e-6 },
      L: { name: 'Liter', symbol: 'L', factor: 0.001 },
      mL: { name: 'Milliliter', symbol: 'mL', factor: 1e-6 },
      in3: { name: 'Cubic Inch', symbol: 'in³', factor: 1.6387064e-5 },
      ft3: { name: 'Cubic Foot', symbol: 'ft³', factor: 0.028316846592 },
      gal_us: { name: 'US Gallon', symbol: 'gal', factor: 0.003785411784 },
      gal_uk: { name: 'Imperial Gallon', symbol: 'gal (UK)', factor: 0.00454609 }
    }
  },

  force: {
    name: 'Force',
    baseUnit: 'N',
    icon: '⚡',
    units: {
      N: { name: 'Newton', symbol: 'N', factor: 1 },
      kN: { name: 'Kilonewton', symbol: 'kN', factor: 1000 },
      MN: { name: 'Meganewton', symbol: 'MN', factor: 1e6 },
      dyn: { name: 'Dyne', symbol: 'dyn', factor: 1e-5 },
      lbf: { name: 'Pound-force', symbol: 'lbf', factor: 4.4482216152605 },
      kgf: { name: 'Kilogram-force (kilopond)', symbol: 'kgf', factor: 9.80665 }
    }
  },

  pressure: {
    name: 'Pressure & Stress',
    baseUnit: 'Pa',
    icon: '🧭',
    units: {
      Pa: { name: 'Pascal', symbol: 'Pa', factor: 1 },
      kPa: { name: 'Kilopascal', symbol: 'kPa', factor: 1000 },
      MPa: { name: 'Megapascal', symbol: 'MPa', factor: 1e6 },
      GPa: { name: 'Gigapascal', symbol: 'GPa', factor: 1e9 },
      bar: { name: 'Bar', symbol: 'bar', factor: 100000 },
      mbar: { name: 'Millibar', symbol: 'mbar', factor: 100 },
      psi: { name: 'Pounds per square inch', symbol: 'psi', factor: 6894.757293168 },
      ksi: { name: 'Kilopounds per square inch', symbol: 'ksi', factor: 6894757.293168 },
      atm: { name: 'Standard Atmosphere', symbol: 'atm', factor: 101325 },
      mmHg: { name: 'Millimeter of Mercury (Torr)', symbol: 'mmHg', factor: 133.322387415 }
    }
  },

  energy: {
    name: 'Energy & Work',
    baseUnit: 'J',
    icon: '🔥',
    units: {
      J: { name: 'Joule', symbol: 'J', factor: 1 },
      kJ: { name: 'Kilojoule', symbol: 'kJ', factor: 1000 },
      MJ: { name: 'Megajoule', symbol: 'MJ', factor: 1e6 },
      cal: { name: 'Calorie (thermochemical)', symbol: 'cal', factor: 4.184 },
      kcal: { name: 'Kilocalorie', symbol: 'kcal', factor: 4184 },
      Wh: { name: 'Watt-hour', symbol: 'W·h', factor: 3600 },
      kWh: { name: 'Kilowatt-hour', symbol: 'kW·h', factor: 3.6e6 },
      eV: { name: 'Electronvolt', symbol: 'eV', factor: 1.602176634e-19 },
      Btu: { name: 'British Thermal Unit (ISO)', symbol: 'Btu', factor: 1055.05585262 },
      ft_lbf: { name: 'Foot-pound force', symbol: 'ft·lbf', factor: 1.3558179483314 }
    }
  },

  power: {
    name: 'Power',
    baseUnit: 'W',
    icon: '💡',
    units: {
      W: { name: 'Watt', symbol: 'W', factor: 1 },
      kW: { name: 'Kilowatt', symbol: 'kW', factor: 1000 },
      MW: { name: 'Megawatt', symbol: 'MW', factor: 1e6 },
      hp_mech: { name: 'Horsepower (Mechanical/Imperial)', symbol: 'hp', factor: 745.69987158227 },
      hp_metric: { name: 'Horsepower (Metric - PS/CV)', symbol: 'hp (metric)', factor: 735.49875 },
      Btu_hr: { name: 'Btu per hour', symbol: 'Btu/h', factor: 0.29307107 },
      ft_lbf_s: { name: 'Foot-pound force per second', symbol: 'ft·lbf/s', factor: 1.3558179483314 }
    }
  },

  torque: {
    name: 'Torque',
    baseUnit: 'Nm',
    icon: '🔄',
    units: {
      Nm: { name: 'Newton-meter', symbol: 'N·m', factor: 1 },
      kNm: { name: 'Kilonewton-meter', symbol: 'kN·m', factor: 1000 },
      Ncm: { name: 'Newton-centimeter', symbol: 'N·cm', factor: 0.01 },
      Nmm: { name: 'Newton-millimeter', symbol: 'N·mm', factor: 0.001 },
      ft_lb: { name: 'Pound-foot', symbol: 'ft·lbf', factor: 1.3558179483314 },
      in_lb: { name: 'Pound-inch', symbol: 'in·lbf', factor: 0.1129848290276 },
      kgf_m: { name: 'Kilogram-force meter', symbol: 'kgf·m', factor: 9.80665 }
    }
  },

  temperature: {
    name: 'Temperature',
    baseUnit: 'K',
    icon: '🌡️',
    isSpecial: true,
    units: {
      C: { name: 'Celsius', symbol: '°C' },
      K: { name: 'Kelvin', symbol: 'K' },
      F: { name: 'Fahrenheit', symbol: '°F' },
      R: { name: 'Rankine', symbol: '°R' }
    }
  },

  density: {
    name: 'Density',
    baseUnit: 'kg_m3',
    icon: '📦',
    units: {
      kg_m3: { name: 'Kilogram per cubic meter', symbol: 'kg/m³', factor: 1 },
      g_cm3: { name: 'Gram per cubic centimeter', symbol: 'g/cm³', factor: 1000 },
      kg_L: { name: 'Kilogram per liter', symbol: 'kg/L', factor: 1000 },
      lb_ft3: { name: 'Pound per cubic foot', symbol: 'lb/ft³', factor: 16.01846337 },
      lb_in3: { name: 'Pound per cubic inch', symbol: 'lb/in³', factor: 27679.90471 }
    }
  },

  velocity: {
    name: 'Velocity & Speed',
    baseUnit: 'm_s',
    icon: '🚀',
    units: {
      m_s: { name: 'Meters per second', symbol: 'm/s', factor: 1 },
      km_h: { name: 'Kilometers per hour', symbol: 'km/h', factor: 1 / 3.6 },
      mph: { name: 'Miles per hour', symbol: 'mph', factor: 0.44704 },
      ft_s: { name: 'Feet per second', symbol: 'ft/s', factor: 0.3048 },
      knot: { name: 'Knot (nautical mile/h)', symbol: 'kn', factor: 0.514444444 }
    }
  },

  acceleration: {
    name: 'Acceleration',
    baseUnit: 'm_s2',
    icon: '🏎️',
    units: {
      m_s2: { name: 'Meter per second squared', symbol: 'm/s²', factor: 1 },
      g_standard: { name: 'Standard gravity (g₀)', symbol: 'g₀', factor: 9.80665 },
      ft_s2: { name: 'Foot per second squared', symbol: 'ft/s²', factor: 0.3048 },
      gal: { name: 'Gal (cm/s²)', symbol: 'Gal', factor: 0.01 },
      km_h_s: { name: 'Kilometer per hour per second', symbol: 'km/(h·s)', factor: 1 / 3.6 }
    }
  },

  flow_rate: {
    name: 'Volumetric Flow Rate',
    baseUnit: 'm3_s',
    icon: '🌊',
    units: {
      m3_s: { name: 'Cubic meter per second', symbol: 'm³/s', factor: 1 },
      m3_h: { name: 'Cubic meter per hour', symbol: 'm³/h', factor: 1 / 3600 },
      L_s: { name: 'Liter per second', symbol: 'L/s', factor: 0.001 },
      L_min: { name: 'Liter per minute (LPM)', symbol: 'L/min', factor: 0.001 / 60 },
      ft3_s: { name: 'Cubic foot per second (cfs)', symbol: 'ft³/s', factor: 0.028316846592 },
      ft3_min: { name: 'Cubic foot per minute (cfm)', symbol: 'CFM', factor: 0.028316846592 / 60 },
      gpm_us: { name: 'US Gallons per minute (GPM)', symbol: 'GPM (US)', factor: 0.003785411784 / 60 }
    }
  },

  viscosity: {
    name: 'Dynamic Viscosity',
    baseUnit: 'Pa_s',
    icon: '🍯',
    units: {
      Pa_s: { name: 'Pascal-second', symbol: 'Pa·s', factor: 1 },
      mPa_s: { name: 'Millipascal-second (cP)', symbol: 'mPa·s', factor: 0.001 },
      P: { name: 'Poise', symbol: 'P', factor: 0.1 },
      cP: { name: 'Centipoise', symbol: 'cP', factor: 0.001 },
      lbf_s_ft2: { name: 'Pound-force second per sq ft', symbol: 'lbf·s/ft²', factor: 47.88025898 }
    }
  }
};
