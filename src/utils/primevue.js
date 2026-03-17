import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice'
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Toolbar from 'primevue/toolbar';
import Toast from 'primevue/toast';
import ConfirmDialog from 'primevue/confirmdialog';
import Card from 'primevue/card';
import Menubar from 'primevue/menubar'
import Badge from 'primevue/badge';
import Avatar from 'primevue/avatar';
import Ripple from 'primevue/ripple';
import Calendar from 'primevue/calendar'
import Sidebar from 'primevue/sidebar';
import StyleClass from 'primevue/styleclass'


export default function setupPrimeVue(app){
    app.use(PrimeVue, {
        ripple: true  // ← efecto ripple en botones
    })
    app.use(ToastService)
    app.use(ConfirmationService)
    app.component('Button', Button)
    app.component('Dialog', Dialog)
    app.component('InputText', InputText)
    app.component('DataTable', DataTable)
    app.component('Column', Column)
    app.component('Toolbar', Toolbar)
    app.component('Toast', Toast)
    app.component('ConfirmDialog', ConfirmDialog)
    app.component('Card', Card)
    app.component('Menubar',Menubar)
    app.component('Badge', Badge) 
    app.component('Avatar', Avatar) 
    app.directive('ripple', Ripple) 
    app.component('Calendar', Calendar) 
    app.component('Sidebar', Sidebar)
    app.directive('styleclass', StyleClass)
    
}
