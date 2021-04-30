import os
import csv
import pandas as pd

data = pd.read_csv('data/Local_Area_Unemployment_Statistics__LAUS_.csv')

data_yrs = data.loc[(data['Year'] >= 2011)]

#print(data_yrs.head())

data_adjust = data_yrs.loc[(data_yrs['Seasonally Adjusted (Y/N)'] == 'Y')]

#print(data_adjust)

data_status = data_adjust.loc[(data_adjust['Status (Preliminary / Final)'] =="Preliminary")]

#print(data_status['Year'].limit[16000])
data_status.to_csv('data/cleaned_LAUS.csv',index=False)