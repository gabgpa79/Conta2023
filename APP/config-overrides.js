const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@core': 'src/app',
    '@reducers/gral': 'src/app/pages/BundleAuth/reducers',
    '@reducers/crm': 'src/app/pages/BundleCrm/reducers',    
    '@reducers/config': 'src/app/pages/BundleConfiguracion/reducers',    
    '@reducers/inventario': 'src/app/pages/BundleInventario/reducers',
    '@reducers/compra': 'src/app/pages/BundleCompra/reducers',
    '@reducers/venta': 'src/app/pages/BundleVenta/reducers',
    '@reducers/tpdv': 'src/app/pages/BundleTpdv/reducers',
    '@reducers/informe': 'src/app/pages/BundleInformes/reducers',
    '@reducers/contabilidad': 'src/app/pages/BundleFinanzas/reducers',
    '@reducers/contables': 'src/app/pages/BundleCobranzas/reducers',
    '@pages': 'src/app/pages',    
    '@layouts': 'src/app/layouts',
    '@auth': 'src/app/auth',
    '@services': 'src/app/services',
    '@components': 'src/app/components',
    '@helpers': 'src/app/helpers',
    '@data': 'src/app/data',
  })(config);

  return config;
};
