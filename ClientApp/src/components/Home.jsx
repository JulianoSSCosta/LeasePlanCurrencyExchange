import React, { Component, Fragment } from 'react';
import { Card, CardContent, Grid, Button, Paper, TextField, Typography, CircularProgress } from "@material-ui/core";
import { createMuiTheme, responsiveFontSizes, ThemeProvider } from '@material-ui/core/styles';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

const formatCurrency = function (value) {
    return parseFloat(value === "" || isNaN(value) ? 0 : value).toLocaleString('en', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
};

export class Home extends Component {
    static displayName = Home.name;

    constructor(props) {
        super(props);
        this.state = {
            Currencies: [],
            Amount: 1.00,
            From: 'EUR',
            To: 'USD',
            Total: 0,
            FromRate: 0,
            Rates: [],
            loading: true
        }
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {
        try {

            const response = await fetch('api/currencies', {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            this.Calculate();
            this.setState({ Currencies: data, loading: false })
        } catch (error) {
            console.error('Error:', error);
        }
    }

    handleChange(e) {
        if (e.target.id === 'From') {
            this.setState({ [e.target.id]: e.target.value, Rates: [] })
        } else {
            this.setState({ [e.target.id]: e.target.value })
        }
    }

    Calculate() {

        fetch(`api/currencies/${this.state.From}?amount=${this.state.Amount}&currencyto=${this.state.To}`)
          .then(response => response.json())
          .then(data => this.setState({ Rates: data.rates, Total: data.valueConvert }))
          .catch((error) => { console.error('Error:', error); })

    }

    render() {

        let theme = createMuiTheme();
        theme = responsiveFontSizes(theme);

        if (this.state.loading) { return (<CircularProgress color="inherit" />); }

        return (
            <Fragment>
            <Card component={Paper}>
                <CardContent>
                    <Grid container spacing={3} >
                            <Grid item sm={4} xs={12}>
                                <TextField id="Amount" label="Amount" type="number" variant="outlined" autoFocus fullWidth
                                    onChange={this.handleChange} value={this.state.Amount}>
                                </TextField>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <TextField id='From' label='From' type="search" variant="outlined"
                                    select
                                    SelectProps={{native: true,}}
                                    onChange={this.handleChange} value={this.state.From}>
                                    {this.state.Currencies.map(Item => <option key={Item.code} value={Item.code}>{Item.code + ' : '+  Item.name}</option>)}<option value=""></option>
                                </TextField>
                            </Grid>
                            <Grid item sm={4} xs={12}>
                                <TextField id='To' label='To' type="search" variant="outlined"
                                    select
                                    SelectProps={{ native: true, }}
                                    onChange={this.handleChange} value={this.state.To}>
                                    {this.state.Currencies.map(Item => <option key={Item.code} value={Item.code}>{Item.code + ' : ' + Item.name}</option>)}<option value=""></option>
                                </TextField>
                            </Grid>
                            <Grid item xs={12}>
                                <Button fullWidth
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    startIcon={<ArrowForwardIosIcon />}
                                    endIcon={<ArrowBackIosIcon />}
                                    onClick={this.Calculate.bind(this)}
                                    >Calculate</Button>
                            </Grid>
                            <Grid item xs={12}> 
                                <div style={{ textAlign: 'center' }}>
                                    <ThemeProvider theme={theme}>
                                        <Typography display="inline" variant="h4" gutterBottom>
                                        {formatCurrency(this.state.Amount)} {' '} {this.state.From} {' = '}
                                        </Typography>
                                        <Typography display="inline" variant="h1" component="h2" gutterBottom>
                                        {formatCurrency(this.state.Rates[this.state.To] * this.state.Amount)}
                                        {/*formatCurrency(this.state.Total)*/}
                                        </Typography>
                                        <Typography display="inline" variant="h4" gutterBottom>
                                        {' '} {this.state.To}
                                        </Typography>
                                        <Typography variant="subtitle2" gutterBottom>
                                            {1}{' '}{this.state.From}{' = '}{this.state.Rates[this.state.To]}{' '}{this.state.To}
                                        </Typography>
                                    </ThemeProvider>
                                </div>
                        </Grid>
                    </Grid>
                </CardContent>
    
            </Card>
        </Fragment>       
        );
  }


}
