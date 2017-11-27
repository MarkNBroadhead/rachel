import React from 'react';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/Menu/MenuItem';


const genders = [
    {
        value: 'male',
        label: 'Male',
    },
    {
        value: 'female',
        label: 'Female',
    },
    {
        value: 'unknown',
        label: 'Unknown',
    },
];


export default ({ user, setUser }) => (
    <div style={{ width: 500 }}>
        <img src={user.picture} height="100" />

        <div>
            <TextField
                id="firstName"
                label="First Name"
                value={user.firstName}
                onChange={(event) => setUser({ firstName: event.target.value })}
                margin="normal"
            />
            <TextField
                id="lastName"
                label="Last Name"
                value={user.lastName}
                onChange={(event) => setUser({ lastName: event.target.value })}
                margin="normal"
            />
        </div>


        <div>
            {moment(user.birthdate).format('D MMM')}

            <TextField
                id="birthdateYear"
                type="number"
                label="Birthdate Year"
                value={moment(user.birthdate).format('YYYY')}
                onChange={(event) => setUser({ birthdate: moment(user.birthdate).year(event.target.value).format('YYYY-MM-DD') })}
                margin="normal"
            />
        </div>


        <TextField
            id="gender"
            select
            label="Gender"
            value={user.gender}
            onChange={(event) => setUser({ gender: event.target.value })}
            margin="normal"
        >
            {genders.map(option => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
        </TextField>

        <div>{user.facebook_profile_url}</div>
    </div>
)